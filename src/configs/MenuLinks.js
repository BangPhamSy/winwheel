/**
 * List of menu items for Top Menu
 */
export const TopMenuLinks = [
  // {
  // 	path: "/landing#benefits",
  // 	className: "link",
  // 	exact: true,
  // 	title: "header.topMenu._benefits",
  // },
  // {
  // 	path: "/landing#mobile-app",
  // 	className: "link",
  // 	exact: true,
  // 	title: "header.topMenu._mobile_app",
  // },
  // {
  // 	path: "/landing#view-card-designs",
  // 	className: "link",
  // 	exact: true,
  // 	title: "header.topMenu._view_card_designs",
  // },
  // {
  // 	path: "/landing#faqs",
  // 	className: "link",
  // 	exact: true,
  // 	title: "header.topMenu._faqs",
  // },
  {
    path: "/sign-in",
    className: "mt-4",
    exact: true,
    title: "header.topMenu._login_signup"
  }
];

/**
 * List of menu items for Sidebar Menu
 */
export const SidebarMenuLinks = [
  // {
  // 	path: "/account",
  // 	className: "link",
  // 	exact: true,
  // 	title: "sidebar.navigation._account",
  // },
  // {
  // 	path: "/rewards",
  // 	className: "link",
  // 	title: "sidebar.navigation._rewards",
  // },
  {
    path: "/about",
    className: "link",
    title: "sidebar.navigation._aboutUs"
  },
  {
    path: "/profile",
    className: "link",
    exact: true,
    title: "sidebar.navigation._profile"
  },
  {
    path: "/cards",
    className: "link",
    title: "sidebar.navigation._cards"
  },
  {
    path: "/transactions",
    className: "link",
    title: "sidebar.navigation._transactions"
  },
  {
    path: "/change-password",
    className: "link",
    exact: true,
    title: "sidebar.navigation._changePassword"
  },
  {
    path: "/policy",
    className: "link",
    exact: true,
    title: "sidebar.navigation._policy"
  },
  {
    path: "/faqs",
    className: "link",
    exact: true,
    title: "sidebar.navigation._faqs"
  }
  // {
  // 	path: "/contact-us",
  // 	className: "link",
  // 	title: "sidebar.navigation._contactUs",
  // },
  // {
  // 	path: "/logout",
  // 	className: "link",
  // 	title: "sidebar.navigation._logout",
  // },
  /*{
		path: "/unregister",
		className: "link link-primary fw-bolder",
		title: "sidebar.navigation._unregister",
	},*/
];

/**
 * List of menu items for Footer menu
 */
export const FooterMenuLinks = [
  {
    title: "About Us",
    titlePath: "#",
    items: [
      {
        path: "#",
        className: "link",
        exact: true,
        title: "CSR & Sustainability"
      },
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Corporate Profile"
      },
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Leadership Team"
      },
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Purpose, Vision and Values"
      },
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Our History"
      },
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Our Global Presence"
      }
    ]
  },
  {
    title: "Media Center",
    titlePath: "#",
    items: [
      {
        path: "#",
        className: "link",
        exact: true,
        title: "News"
      },
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Events & Promotions"
      }
    ]
  },
  {
    title: "Career",
    titlePath: "",
    items: [
      {
        path: "#",
        className: "link",
        exact: true,
        title: "Overview"
      }
    ]
  }
];

export const viFooterMenuLinks = [];
