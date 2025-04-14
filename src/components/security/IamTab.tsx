
import React from 'react';
import { Lock } from 'lucide-react';

const IamTab = () => {
  return (
    <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
      <div className="text-center">
        <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Identity & Access Management</h3>
        <p className="text-muted-foreground">
          Manage users, roles, and access policies across cloud providers.
        </p>
      </div>
    </div>
  );
};

export default IamTab;
