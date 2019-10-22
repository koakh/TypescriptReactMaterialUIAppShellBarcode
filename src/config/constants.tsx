import { AddBox as AddBoxIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, PanTool as PanToolIcon, Explore as ExploreIcon, Loyalty as LoyaltyIcon } from '@material-ui/icons';
import React from 'react';
import { Causes, Community, Feed, Home, Profile, SignUp } from '../components/pages';
import { DrawerListItem, DrawerSections, RouteItem } from '../types';

export const defaultDrawerListItemIcon: JSX.Element = <AddBoxIcon />;

export const routes: RouteItem[] = [
  {
    label: 'Home',
    path: "/",
    component: Home,
    exact: true,
    drawerIcon: <HomeIcon />,
  },
  {
    label: 'Feed',
    path: "/feed",
    component: Feed,
    section: DrawerSections.SECTION1,
    drawerIcon: <FingerprintIcon />,
  },
  {
    label: "Profile",
    path: "/profile",
    component: Profile,
    section: DrawerSections.SECTION1,
    drawerIcon: <PanToolIcon />,
  },
  {
    label: "Causes",
    path: "/causes",
    component: Causes,
    section: DrawerSections.SECTION2,
    drawerIcon: <ExploreIcon />,
  },
  {
    label: "Community",
    path: "/community",
    component: Community,
    section: DrawerSections.SECTION2,
    drawerIcon: <LoyaltyIcon />,
  },
  {
    label: "Sign Up",
    path: "/sign-up",
    component: SignUp,
    section: DrawerSections.SECTION3,
    // drawerIcon: USE DEFAULT HERE,
  }
];

export const drawerTitle: string = 'MUI Starter';
export const drawerCategories: DrawerListItem[] = routes.map((e: RouteItem) => {
  return { label: e.label, path: e.path, section: e.section, icon: e.drawerIcon }
});
