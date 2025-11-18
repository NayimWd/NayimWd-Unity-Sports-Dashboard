import { Edit2, Edit3, Filter, Search } from "lucide-react"
import FormContainer from "../../component/common/Form/FormContainer"
import TextInput from "../../component/common/input/TextInput"
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { fontStyle } from "../../utils/ClassUtils"
import DropdownInput from "../../component/common/input/DropdownInput"
import Buttons from "../../component/common/Buttons"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { filterUserSchema, FilterUserType } from "../../utils/types/accountType"
import TableSkeleton from "../../component/common/Table/TableSkeleton"
import TableEmpty from "../../component/common/Table/TableEmpty"
import TableRow from "../../component/common/Table/TableRow"
import Table from "../../component/common/Table/Table"
import TableHeader from "../../component/common/Table/TableHeader"
import TablePagination from "../../component/common/Table/TablePagination"
import Dropdown from "../../component/common/dropdown/Dropdown"
import { useAllUserQuery } from "../../features/auth/authApi"
import ConfirmModal from "../../component/ui/modal/ConfirmModal"
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils"
import { useChangeRoleMutation } from "../../features/account/accountApi"
import toast from "react-hot-toast"


const AllUsers = () => {
    // pagination
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState({
        userId: "",
        role: ""
    })

    // fetch data from apiSlice
    const { data, isLoading, isError } = useAllUserQuery({
        page: currentPage,
        limit: pageSize,
        ...filters,
    });

    // change role mutaion
    const [changeRole, { isLoading: roleChangeLoader, }] = useChangeRoleMutation();

    const totalPages = data?.data?.pagination?.totalPages ?? 1;

    // table headings
    const headerData = useMemo(
        () => ["Photo", "Name", "Email", "Phone", "Role", "Action"],
        []
    );

    // filter dropdown options
    const roleOptions = [
        { label: "Admin", value: "admin" },
        { label: "Staff", value: "staff" },
        { label: "Player", value: "player" },
        { label: "Manager", value: "manager" },
        { label: "Umpire", value: "umpire" },
    ];

    const sortFieldOptions = [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Role", value: "role" },
    ];

    const sortOrderOptions = [
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" },
    ];


    // RHF
    const form = useForm<FilterUserType>({
        resolver: zodResolver(filterUserSchema),
        mode: "onSubmit",
        defaultValues: {
            name: "",
            email: "",
            role: "",
            sortField: "",
            sortOrder: "",
        },
    });

    const { reset } = form;

    // submit filters
    const onSubmit = (data: FilterUserType) => {
        const sanitized = {
            name: data.name?.trim() || "",
            email: data.email?.trim() || "",
            role: data.role || "",
            sortField: data.sortField || "",
            sortOrder: data.sortOrder || "",
        };

        setFilters(sanitized);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        reset();
        setFilters({});
        setCurrentPage(1);
    };


    const handleRole = async () => {
        if (!userRole.userId && !userRole.role) return;
        const loadingId = LoadingToast({ msg: `Changing user role to ${userRole.role}...` });
        try {
            const { userId, role } = userRole;
            await changeRole({
                userId,
                data: {role}
            }).unwrap();
            toast.dismiss(loadingId);
            SuccessToast({ msg: `Changed role to ${userRole.role}!` });
            setUserRole({ userId: "", role: "" });
            setOpen(false);
        } catch (error) {
            toast.dismiss(loadingId);
            ErrorToast({ msg: "Change role failed!" });
            setUserRole({ userId: "", role: "" });
            setOpen(false);
        } finally {
            toast.dismiss(loadingId);
            setOpen(false);
        }

    }

    // table content
    const content = useMemo(() => {
        if (isLoading) {
            return [...Array(5)].map((_, i) => (
                <TableSkeleton key={i} columns={headerData.length} />
            ));
        }

        if (isError || !data?.data?.users?.length) {
            return (
                <TableEmpty
                    colSpan={headerData.length}
                    message="No Users Found!"
                />
            );
        }

        return data?.data.users.map((user) => (
            <TableRow
                key={user._id}
                rowData={[
                    <img
                        src={user.photo}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover object-center"
                        loading="lazy"
                    />,
                    user.name,
                    user.email,
                    user.phoneNumber ?? "N/A",
                    user.role,
                    <div className="flex gap-2 relative">
                        <Dropdown className="">
                            <Dropdown.Trigger>
                                <Edit2 size="14" /> Role
                            </Dropdown.Trigger>
                            <Dropdown.Menu className="absolute -left-10">
                                <Dropdown.Item onClick={() => { setUserRole({ userId: (user as any)._id, role: "admin" }), setOpen(true) }}>
                                    <Edit3 size={14} /> Make Admin
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => { setUserRole({ userId: (user as any)._id, role: "staff" }), setOpen(true) }}>
                                    <Edit2 size={14} /> Make Staff
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>,
                ]}
            />
        ));
    }, [isLoading, isError, data, headerData]);


    return (
        <PageLayout>
            <h1 className={`${fontStyle.pageTitle} text-center text-font mb-6`}>
                Manage Users
            </h1>
            <SectionLayout>
                {/* filter user section */}
                <FormContainer
                    methods={form}
                    onSubmit={onSubmit}
                    className="w-full flex flex-wrap justify-center gap-3 lg:gap-10 items-center"
                >
                    <TextInput
                        label="Name"
                        name="name"
                        placeholder="Search by name..."
                        icon={<Search size={16} />}
                    />

                    <TextInput
                        label="Email"
                        name="email"
                        placeholder="Search by email..."
                        icon={<Search size={16} />}
                    />

                    <DropdownInput
                        label="Role"
                        name="role"
                        options={roleOptions}
                    />

                    <DropdownInput
                        label="Sort Field"
                        name="sortField"
                        options={sortFieldOptions}
                    />

                    <DropdownInput
                        label="Sort Order"
                        name="sortOrder"
                        options={sortOrderOptions}
                    />

                    <div className="mt-7 flex items-center gap-4">
                        <Buttons type="submit" className="rounded" iconLeft={<Filter size={16} />}>
                            Filter
                        </Buttons>

                        <Buttons
                            type="button"
                            variant="secondary"
                            className="rounded"
                            onClick={handleClearFilters}
                        >
                            Clear
                        </Buttons>
                    </div>
                </FormContainer>
                {/* Table */}
                <Table>
                    <TableHeader headers={headerData} />
                    {content}
                </Table>
            </SectionLayout>

            {/* Pagination */}
            <div className="w-full flex justify-center mt-6">
                <TablePagination
                    currentPage={currentPage}
                    totalPage={totalPages}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <ConfirmModal
                isOpen={open}
                onOpenChange={setOpen}
                onConfirm={handleRole}
                title="Are you sure?"
                description="Change user role"
                loading={roleChangeLoader}
            />
        </PageLayout>
    )
};

export default AllUsers;