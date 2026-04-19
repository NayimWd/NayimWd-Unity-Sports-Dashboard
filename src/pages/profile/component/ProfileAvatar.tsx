
const ProfileAvatar = ({ photo, name }: { photo?: string; name?: string }) => (
    <div className="relative flex-shrink-0">
        {photo ? (
            <img
                src={photo}
                alt={name}
                className="w-16 h-16 rounded-xl object-cover border border-border"
                loading="lazy"
            />
        ) : (
            <div className="w-16 h-16 rounded-xl bg-subSurface flex items-center justify-center text-lg font-medium text-muted">
                {name?.charAt(0).toUpperCase()}
            </div>
        )}
        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-surface rounded-full" />
    </div>
);


export default ProfileAvatar;