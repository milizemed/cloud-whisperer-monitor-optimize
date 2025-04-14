
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Settings, Clock, User, Cloud, Bell, LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const SettingItem = ({ title, description, icon: Icon, children }: SettingItemProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
      <div className="flex gap-4 mb-4 md:mb-0">
        <div className="flex h-10 w-10 rounded-md items-center justify-center bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="ml-14 md:ml-0">
        {children}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing settings data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Settings data refreshed');
    }, 1500);
  };

  const saveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
        className="w-64 hidden md:block"
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: Just now
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
          
          <Tabs defaultValue="general" className="mb-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API & Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your dashboard preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <SettingItem 
                      title="Theme" 
                      description="Toggle between light and dark mode" 
                      icon={Settings}
                    >
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="theme-mode" 
                          checked={isDarkMode}
                          onCheckedChange={toggleDarkMode}
                        />
                        <Label htmlFor="theme-mode">Dark Mode</Label>
                      </div>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Auto Refresh" 
                      description="Automatically refresh dashboard data" 
                      icon={RefreshCw}
                    >
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="auto-refresh" 
                          checked={autoRefresh}
                          onCheckedChange={setAutoRefresh}
                        />
                        <Label htmlFor="auto-refresh">Enable</Label>
                      </div>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Default Dashboard" 
                      description="Set your default view when logging in" 
                      icon={Cloud}
                    >
                      <Select defaultValue="overview">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overview">Overview</SelectItem>
                          <SelectItem value="aws">AWS Dashboard</SelectItem>
                          <SelectItem value="azure">Azure Dashboard</SelectItem>
                        </SelectContent>
                      </Select>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Time Zone" 
                      description="Set your preferred time zone for the dashboard" 
                      icon={Clock}
                    >
                      <Select defaultValue="utc">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                          <SelectItem value="cet">Central European Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </SettingItem>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <SettingItem 
                      title="Profile Information" 
                      description="Update your account details" 
                      icon={User}
                    >
                      <div className="flex flex-col space-y-2 w-full md:w-[280px]">
                        <Input placeholder="Name" defaultValue="Alex Johnson" />
                        <Input placeholder="Email" defaultValue="alex@example.com" />
                      </div>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Password" 
                      description="Change your account password" 
                      icon={Settings}
                    >
                      <Button variant="outline">Change Password</Button>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Two-Factor Authentication" 
                      description="Enhance your account security" 
                      icon={Settings}
                    >
                      <Button variant="outline">Enable 2FA</Button>
                    </SettingItem>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <SettingItem 
                      title="Email Notifications" 
                      description="Receive alerts via email" 
                      icon={Bell}
                    >
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="email-notifications" 
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                        <Label htmlFor="email-notifications">Enable</Label>
                      </div>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Slack Notifications" 
                      description="Receive alerts in Slack" 
                      icon={Bell}
                    >
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="slack-notifications" 
                          checked={slackNotifications}
                          onCheckedChange={setSlackNotifications}
                        />
                        <Label htmlFor="slack-notifications">Enable</Label>
                      </div>
                    </SettingItem>
                    
                    <Separator />
                    
                    <SettingItem 
                      title="Alert Preferences" 
                      description="Set which types of alerts you want to receive" 
                      icon={Bell}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="critical-alerts" defaultChecked />
                          <Label htmlFor="critical-alerts">Critical Alerts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="warning-alerts" defaultChecked />
                          <Label htmlFor="warning-alerts">Warning Alerts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="info-alerts" defaultChecked />
                          <Label htmlFor="info-alerts">Informational Alerts</Label>
                        </div>
                      </div>
                    </SettingItem>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Cloud className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">API & Integrations</h3>
                  <p className="text-muted-foreground">
                    Manage API keys and third-party integrations.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button onClick={saveSettings}>
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
