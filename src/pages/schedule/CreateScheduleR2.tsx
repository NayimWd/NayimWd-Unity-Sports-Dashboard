import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import PageHeader from "../../component/ui/PageHeader";
import { ITournamentSearch } from "../../utils/types/tournamentTypes";
import { IVenueSearch } from "../../utils/types/venueType";
import { ITeamSearch } from "../../utils/types/teamType";
import { IMatchSearch } from "../../utils/types/matchTypes";
import { ScheduleRQFormData, scheduleSchemaRQ } from "../../utils/schema/scheduleSchema";
import { useApprovedTeamQuery, useSearchTournamentQuery } from "../../features/tournament/tournamentApi";
import { useVenueSearchQuery } from "../../features/venue/venueApi";
import { useMatchOverviewQuery } from "../../features/match/matchApi";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import TextInput from "../../component/common/input/TextInput";
import { matchNumbers, matchRound } from "./formHelper/formUtils";
import PickerModal from "../../component/ui/modal/PickerModal";
import DateInput from "../../component/common/input/DateInput";

// interface
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}

type ActivePicker = "tournament" | "venue" | "teamA" | "teamB" | "matchA" | "matchB" | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

// normalize data for maintain api data shape
const normalizeTournament = (t: ITournamentSearch): PickerItem => ({
  _id: t._id, name: t.tournamentName
});

const normalizeVenue = (v: IVenueSearch): PickerItem => ({
  _id: v._id, name: `${v.city} ${v.city}`
});

const normalizeTeam = (t: ITeamSearch): PickerItem => ({
  _id: t._id, name: t.teamName,
});
const normalizeMatch = (m: IMatchSearch): PickerItem => ({
  _id: m._id, name: `Match ${m.matchNumber} — ${m.status}`,
});

// set step map for RHF trigger
const stepFields: Record<number, (keyof ScheduleRQFormData)[]> = {
  1: ["tournamentId"],
  2: ["venueId", "round", "matchNumber", "matchDate", "matchTime"],
  3: ["matchA", "matchB"],
};

const STEPS = ["Tournament", "Details", "Teams & Matches"];



const CreateScheduleR2 = () => {
  const goBack = useGoBack();
  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [tId, setTId] = useState<string>("");
  const [selected, setSelected] = useState<SelectedMap>({
    tournament: null, venue: null,
    teamA: null, teamB: null,
    matchA: null, matchB: null,
  });

  const methods = useForm<ScheduleRQFormData>({
    resolver: zodResolver(scheduleSchemaRQ),
    mode: "onSubmit",
  });
  const { setValue, trigger } = methods;

  // fetch data with rtk query
  const { data: tournamentRes, isLoading: tLoading } = useSearchTournamentQuery("");
  const { data: venueRes, isLoading: vLoading } = useVenueSearchQuery(undefined);
  const { data: teamRes, isLoading: tmLoading } = useApprovedTeamQuery(
    { tournamentId: tId }, { skip: !tId }
  );
  const { data: matchRes, isLoading: mLoading } = useMatchOverviewQuery(
    { tournamentId: tId }, { skip: !tId }
  );

  // normalize API data
  const tournaments = (tournamentRes?.data ?? []).map(normalizeTournament);
  const venues = (venueRes?.data ?? []).map(normalizeVenue);
  const teams = (teamRes?.data ?? []).map(normalizeTeam);
  const matches = (matchRes?.data ?? []).map(normalizeMatch);

  // for pick options from list to extract id
  const handleSelect = (field: string, item: PickerItem) => {
    setValue(field as keyof ScheduleRQFormData, item._id, { shouldValidate: true });
    setSelected((prev) => ({ ...prev, [field]: item }));
    if (field === "tournamentId") setTId(item._id);
  };

  // clear form handler
  const handleClear = (field: string) => {
    setValue(field as keyof ScheduleRQFormData, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [field]: null }));
    if (field === "tournamentId") {
      setTId("");
      // clear dependent fields
      (["teamA", "teamB", "matchA", "matchB"] as const).forEach(f => {
        setValue(f, null);
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  }

  // next button trigger
  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: ScheduleRQFormData) => {
    console.log(data);
    // fire RTK mutation here
  };


  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; field: string; isLoading: boolean }
  > = {
    tournament: { title: "Select Tournament", items: tournaments, field: "tournamentId", isLoading: tLoading },
    venue: { title: "Select Venue", items: venues, field: "venueId", isLoading: vLoading },
    teamA: { title: "Select Team A", items: teams, field: "teamA", isLoading: tmLoading },
    teamB: { title: "Select Team B", items: teams, field: "teamB", isLoading: tmLoading },
    matchA: { title: "Select Match A", items: matches, field: "matchA", isLoading: mLoading },
    matchB: { title: "Select Match B", items: matches, field: "matchB", isLoading: mLoading },
  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Schedule Setup"
        title="Create Qualifier Schedule"
        subtitle="Fill in the details to schedule a qualifier match"
      />

      <SectionLayout>
        {/* step button */}
        <div className="flex items-center justify-center gap-2 mb-10 max-w-sm mx-auto">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const current = step === n;
            return (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                    ${done ? "bg-primary text-white"
                      : current ? "bg-primary/10 text-primary border border-primary"
                        : "bg-subSurface text-muted border border-border"}`}>
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : n}
                  </div>
                  <span className={`text-[10px] whitespace-nowrap ${current ? "text-primary" : "text-muted"}`}>
                    {label}
                  </span>
                </div>
                {n < STEPS.length && (
                  <div className={`h-px flex-1 mb-4 transition-colors ${done ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* form */}
        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* ── Step 1 — Tournament ── */}
          {step === 1 && (
            <div className="space-y-6">
              <EntityPickerInput
                name="tournamentId"
                label="Tournament"
                placeholder="Select a tournament"
                selected={selected.tournament}
                onPick={() => setActivePicker("tournament")}
                onClear={() => handleClear("tournamentId")}
              />
            </div>
          )}

          {/* ── Step 2 — Details ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DropdownInput
                  label="Round"
                  name="round"
                  placeholder="Pick a round"
                  options={matchRound}
                />
                <DropdownInput
                  label="Match Number"
                  name="matchNumber"
                  placeholder="Pick match number"
                  options={matchNumbers}
                />
                <DateInput
                  label="Match Date"
                  name="matchDate"
                  placeholder="DD-MM-YYYY"
                  type="text"
                />
                <TextInput
                  label="Match Time"
                  name="matchTime"
                  placeholder="e.g. 3pm"
                  type="text"
                />
              </div>
              <EntityPickerInput
                name="venueId"
                label="Venue"
                placeholder="Select a venue"
                selected={selected.venue}
                onPick={() => setActivePicker("venue")}
                onClear={() => handleClear("venueId")}
              />
            </div>
          )}

          {/* ── Step 3 — Teams & Matches ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EntityPickerInput
                  name="matchA"
                  label="Match A"
                  placeholder="Select Match A"
                  selected={selected.matchA}
                  onPick={() => setActivePicker("matchA")}
                  onClear={() => handleClear("matchA")}
                />
                <EntityPickerInput
                  name="matchB"
                  label="Match B"
                  placeholder="Select Match B"
                  selected={selected.matchB}
                  onPick={() => setActivePicker("matchB")}
                  onClear={() => handleClear("matchB")}
                />
                <EntityPickerInput
                  name="teamA"
                  label="Team A (optional)"
                  placeholder="Auto-resolved after R1"
                  selected={selected.teamA}
                  onPick={() => setActivePicker("teamA")}
                  onClear={() => handleClear("teamA")}
                />
                <EntityPickerInput
                  name="teamB"
                  label="Team B (optional)"
                  placeholder="Auto-resolved after R1"
                  selected={selected.teamB}
                  onPick={() => setActivePicker("teamB")}
                  onClear={() => handleClear("teamB")}
                />
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="px-4 py-2 text-sm text-subtext border border-border rounded-lg
                           hover:bg-subSurface transition-colors"
              >
                ← Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 text-sm font-medium text-white bg-primary
                           hover:bg-primaryHover rounded-lg transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-primary
                           hover:bg-primaryHover rounded-lg transition-colors"
              >
                Create Schedule
              </button>
            )}
          </div>
        </FormContainer>
      </SectionLayout>

      {/* picker modal */}
      {active && (
        <PickerModal
          isOpen={!!activePicker}
          onOpenChange={(open) => { if (!open) setActivePicker(null); }}
          title={active.title}
          items={active.items}
          selectedId={selected[activePicker!]?._id}
          onSelect={(item) => handleSelect(active.field, item)}
          isLoading={active.isLoading}
        />
      )}

    </PageLayout>
  )
}

export default CreateScheduleR2;
