import { AddBox as AddBoxIcon, Explore as ExploreIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, Loyalty as LoyaltyIcon, PanTool as PanToolIcon } from '@material-ui/icons';
import React from 'react';
import { Causes, CodeGenerator, CodeReader, Community, Feed, Home, Login, MultiFormatCodeReader, Profile, SignUp } from '../components/pages';
import { DrawerListItem, DrawerSections, RouteItem } from '../types';

export const defaultDrawerListItemIcon: JSX.Element = <AddBoxIcon />;
export const subStrCode = (code: string) => code.substr(0, 28);

// route
export const routes: RouteItem[] = [
  {
    label: 'Home',
    path: "/",
    component: Home,
    section: DrawerSections.SECTION0,
    drawerIcon: <HomeIcon />,
    exact: true,
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
    label: "Code Generator",
    path: "/code-generator",
    component: CodeGenerator,
    section: DrawerSections.SECTION3,
    // drawerIcon: USE DEFAULT HERE,
  },
  {
    label: "Code Reader",
    path: "/code-reader",
    component: CodeReader,
    section: DrawerSections.SECTION3,
    // drawerIcon: USE DEFAULT HERE,
  },
  {
    label: "Multi Code Reader",
    path: "/multi-format-code-reader",
    component: MultiFormatCodeReader,
    section: DrawerSections.SECTION3,
    // drawerIcon: USE DEFAULT HERE,
  },
  {
    label: "Login",
    path: "/login",
    component: Login,
    section: DrawerSections.SECTION4,
    // drawerIcon: USE DEFAULT HERE,
  },
  {
    label: "Sign Up",
    path: "/sign-up",
    component: SignUp,
    section: DrawerSections.SECTION4,
    // drawerIcon: USE DEFAULT HERE,
  }
];

// drawer appShell
export const drawerWidth: number = 240;
export const drawerTitle: string = 'MUI Starter';
export const drawerCategories: DrawerListItem[] = routes.map((e: RouteItem) => {
  return { label: e.label, path: e.path, section: e.section, icon: e.drawerIcon }
});
