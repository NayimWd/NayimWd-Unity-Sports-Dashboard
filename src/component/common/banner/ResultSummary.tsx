import { Award, Calendar, Medal, Trophy } from "lucide-react";



interface SummaryProps {
    result: any
    tournament: any
}


const ResultSummary = ({ result, tournament }: SummaryProps) => {

    if (!result || !tournament) return null;

    return (
        <div className="w-full bg-surface rounded-2xl overflow-hidden border border-border">
      
      {/* Tournament Info */}
     
      <div className="relative h-48 overflow-hidden bg-black/30">
        <img 
          src={tournament.photo} 
          alt={tournament.name}
          className="w-full h-full object-cover bg-center opacity-80 dark:opacity-25"
        />
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {tournament.name}
              </h2>
              <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Concluded {tournament.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Content Grid */}
      <div className="p-6 bg-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: Tournament Winners */}
          <div>
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Tournament Results
            </h3>
            <div className="space-y-3">
              
              {/* Champion */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-primary group hover:shadow-md transition-all">
                <div className="relative">
                  <img 
                    src={result.result.champion.teamLogo}
                    alt={result.result.champion.teamName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white/80 mb-0.5">
                    🏆 Champion
                  </p>
                  <p className="text-base font-bold text-white">
                    {result.result.champion.teamName}
                  </p>
                </div>
              </div>

              {/* Runner-up */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all">
                <div className="relative">
                  <img 
                    src={result.result.runnerUp.teamLogo} 
                    alt={result.result.runnerUp.teamName}
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: '#c0c0c0' }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#c0c0c0' }}>
                    <Medal className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted mb-0.5">
                    Runner-up
                  </p>
                  <p className="text-sm font-semibold text-font">
                    {result.result.runnerUp.teamName}
                  </p>
                </div>
              </div>

              {/* Third Place */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all">
                <div className="relative">
                  <img 
                    src={result.result.thirdPlace.teamLogo} 
                    alt={result.result.thirdPlace.teamName}
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: '#cd7f32' }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#cd7f32' }}>
                    <Medal className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted mb-0.5">
                    Third Place
                  </p>
                  <p className="text-sm font-semibold text-font">
                    {result.result.thirdPlace.teamName}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Best Player */}
          <div>
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Tournament MVP
            </h3>
            <div className="p-5 rounded-xl bg-gradient-secondary border border-border">
              <div className="flex flex-col sm:flex-row  items-center sm:items-start gap-4 ">
                <div className="relative md:mt-0">
                  <img 
                    src={result.manOfTheTournament.photo} 
                    alt={result.manOfTheTournament.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-xs font-semibold text-muted text-font/70 mb-1">
                    {result.awardFor}
                  </p>
                  <h4 className="text-xl font-bold text-font mb-2">
                    {result.manOfTheTournament.name}
                  </h4>
                  <p className="text-sm text-subtext leading-relaxed">
                    Outstanding performance with exceptional skills and dedication throughout the tournament
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats (Optional - can be dynamic) */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-surface border border-border">
                <p className="text-xs text-muted mb-1">Matches</p>
                <p className="text-lg font-bold text-primary">12</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-surface border border-border">
                <p className="text-xs text-muted mb-1">Teams</p>
                <p className="text-lg font-bold text-primary">8</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-surface border border-border">
                <p className="text-xs text-muted mb-1">Duration</p>
                <p className="text-lg font-bold text-primary">2w</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
    )
}

export default ResultSummary;
