
import { useState } from "react";
export const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['Profile', 'Security', 'Notifications', 'Payment Methods'].map((tab) => (
                <button
                  key={tab.toLowerCase()}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-4 px-2 border-b-2 font-medium ${
                    activeTab === tab.toLowerCase()
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <img
                    src="/api/placeholder/80/80"
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    Change Photo
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Thompson"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  