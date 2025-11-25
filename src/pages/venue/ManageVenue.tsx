import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils";
import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import { useGetVenueQuery } from "../../features/venue/venueApi";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableRow from "../../component/common/Table/TableRow";
import Dropdown from "../../component/common/dropdown/Dropdown";
import { Book, Edit2, Edit3 } from "lucide-react";
import SectionLayout from "../../component/layout/SectionLayout";


const ManageVenue = () => {
  const goBack = useGoBack();

  // fetch blogs
  const { data: venues, isLoading, isError } = useGetVenueQuery();
  // header data
  const headerData = ["Photo", "Name", "City", "Action"];

  let content = null;

  if (isLoading) {
    content = ([...Array(5)].map((_, index) => (
      <TableSkeleton key={index} columns={headerData.length} />
    )))
  } else if (isError || venues?.data.total === 0) {
    content = <TableEmpty message="No Venue Found!" />
  }
  else {
    content = (
      venues?.data.venues.map((venue) => (
        <TableRow key={venue._id}
          rowData={[
            <div className="flex items-center gap-4">
              <img
                className="w-10 h-10 rounded-full object-cover object-center"
                src={venue.photo}
                alt="Blog"
                loading="lazy"
              />
            </div>,
            venue.name,
            venue.city,
            <div>
              <Dropdown className="">
                <Dropdown.Trigger>
                  <Edit2 size="14" /> Edit
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/dashboard/venue/${venue._id}`}>
                    <Book size={14} /> Read Details
                  </Dropdown.Item>
                  <Dropdown.Item href={`/dashboard/venue/editDetails/${venue._id}`}>
                    <Edit3 size={14} /> Edit Details
                  </Dropdown.Item>
                  <Dropdown.Item href={`/dashboard/venue/editPhoto/${venue._id}`}>
                    <Edit2 size={14} /> Edit Photo
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ]}
        >

        </TableRow>
      ))
    )
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-font text-center`}>Manage Tournament Blogs</h1>
      <SectionLayout>
      <Table>
        <TableHeader headers={headerData} />
        {content}
      </Table>
      </SectionLayout>
    </PageLayout>
  )
}

export default ManageVenue