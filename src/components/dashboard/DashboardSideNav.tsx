'use client';
import React, { Suspense } from 'react';
import DashboardSideNavContent from './DashboardSideNavContent';
import DashboardSideNavSkeleton from './DashboardSideNavSkeleton';

export default function DashboardSideNav() {
    return (
        <Suspense fallback={<DashboardSideNavSkeleton />}>
            <DashboardSideNavContent />
        </Suspense>
    );
};