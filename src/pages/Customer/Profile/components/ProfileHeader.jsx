import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-suxnix-primary to-amber-400 text-white py-12 px-4">
      <div className="max-w-330 mx-auto container">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-white shadow-lg">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-3xl font-bold"
                style={{ color: '#faa432' }}
              >
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-lg opacity-90">{user?.email}</p>
            {user?.bio && (
              <p className="text-base opacity-80 mt-2 max-w-md">{user.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
