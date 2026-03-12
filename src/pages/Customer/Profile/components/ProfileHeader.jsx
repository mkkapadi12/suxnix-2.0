import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-linear-to-r from-suxnix-primary to-amber-400 text-white py-4 sm:py-6 px-4 rounded-lg">
      <div className="max-w-330 mx-auto container">
        <div className="flex flex-row items-center gap-2 md:gap-8">
          {/* Avatar */}
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white flex md:items-center md:justify-center shrink-0 overflow-hidden border-4 border-white">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-suxnix-primary">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-left flex-1 space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-base sm:text-lg opacity-90">{user?.email}</p>
            {user?.bio && (
              <p className="text-base hidden sm:block opacity-80 max-w-full">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
