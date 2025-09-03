import React from 'react';
import { Home, Users, User, Settings } from 'lucide-react';

const AppShell = ({ children, currentView, onViewChange, isConnected }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'creators', label: 'Creators', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-textSecondary hover:text-textPrimary hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen bg-surface border-r border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BT</span>
              </div>
              <div>
                <h1 className="text-heading text-textPrimary">Base Tipper</h1>
                <p className="text-caption text-xs">Tip creators effortlessly</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'text-textSecondary hover:text-textPrimary hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-body">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:p-8 p-4 pb-20 lg:pb-8">
          <div className="max-w-screen-sm lg:max-w-none mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShell;