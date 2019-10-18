import Loadable from "react-loadable";
import Loading from "../views/components/shared/Loading";

import LogOut from "../views/pages/LogOut";
import NotFound from "../views/pages/NotFound";
import About from "../views/pages/About";

const AsyncSignIn = Loadable({
    loader: () => import("../views/pages/SignIn"),
    loading: Loading
  }),
  AsyncVerification = Loadable({
    loader: () => import("../views/pages/Verification"),
    loading: Loading
  }),
  AsyncNotifications = Loadable({
    loader: () => import("../views/pages/Notifications"),
    loading: Loading
  }),
  AsyncUnregisterVerification = Loadable({
    loader: () => import("../views/pages/UnregisterVerification"),
    loading: Loading
  }),
  AsyncCSOLogin = Loadable({
    loader: () => import("../views/pages/CSOLogin"),
    loading: Loading
  }),
  AsyncSignUp = Loadable({
    loader: () => import("../views/pages/SignUp"),
    loading: Loading
  }),
  AsyncForgotPassword = Loadable({
    loader: () => import("../views/pages/ForgotPassword"),
    loading: Loading
  }),
  AsyncUnRegister = Loadable({
    loader: () => import("../views/pages/UnRegister"),
    loading: Loading
  }),
  AsyncAccount = Loadable({
    loader: () => import("../views/pages/Account"),
    loading: Loading
  }),
  AsyncContactUs = Loadable({
    loader: () => import("../views/pages/ContactUs"),
    loading: Loading
  }),
  AsyncTransactions = Loadable({
    loader: () => import("../views/pages/CardTransactions"),
    loading: Loading
  }),
  AsyncRewards = Loadable({
    loader: () => import("../views/pages/Rewards"),
    loading: Loading
  }),
  AsyncProfile = Loadable({
    loader: () => import("../views/pages/Profile"),
    loading: Loading
  }),
  AsyncCards = Loadable({
    loader: () => import("../views/pages/Cards"),
    loading: Loading
  }),
  AsyncCardDetails = Loadable({
    loader: () => import("../views/pages/CardDetails"),
    loading: Loading
  }),
  AsyncAddCard = Loadable({
    loader: () => import("../views/pages/AddCard"),
    loading: Loading
  }),
  AsyncChangePassword = Loadable({
    loader: () => import("../views/pages/ChangePassword"),
    loading: Loading
  }),
  AsyncTransactionDetails = Loadable({
    loader: () => import("../views/pages/TransactionDetails"),
    loading: Loading
  }),
  AsyncResetPassword = Loadable({
    loader: () => import("../views/pages/ResetPassword"),
    loading: Loading
  }),
  AsyncTransferBalance = Loadable({
    loader: () => import("../views/pages/TransferBalance"),
    loading: Loading
  }),
  AsyncReportLossPage = Loadable({
    loader: () => import("../views/pages/ReportLoss"),
    loading: Loading
  }),
  AsyncVerifyGoldCardAddressPage = Loadable({
    loader: () => import("../views/pages/VerifyGoldCardAddress"),
    loading: Loading
  }),
  AsyncPrivacyPolicy = Loadable({
    loader: () => import("../views/pages/PrivacyPolicy"),
    loading: Loading
  }),
  AsyncFaqs = Loadable({
    loader: () => import("../views/pages/Faqs"),
    loading: Loading
  });

const localeRegex = ":locale(en|vi)?";

const Routes = [
  {
    path: `/${localeRegex}/sign-in`,
    isPrivate: false,
    component: AsyncSignIn
  },
  {
    path: `/${localeRegex}/cards`,
    isPrivate: false,
    component: AsyncCards
  },
  {
    path: `/${localeRegex}/sign-up`,
    isPrivate: false,
    component: AsyncSignUp
  },
  {
    path: `/${localeRegex}/forgot-password`,
    isPrivate: false,
    component: AsyncForgotPassword
  },
  {
    path: `/${localeRegex}/reset-password/:mid/:ts`,
    isPrivate: false,
    component: AsyncResetPassword
  },
  {
    path: `/${localeRegex}/verification/:mid/:cn/:ts`,
    isPrivate: false,
    component: AsyncVerification
  },
  {
    path: `/${localeRegex}/unregisterVerification/:mid/:cn`,
    isPrivate: false,
    component: AsyncUnregisterVerification
  },
  {
    path: `/${localeRegex}/csologin/:Param`,
    isPrivate: false,
    component: AsyncCSOLogin
  }
];

const PrivateRoutes = [
  {
    path: `/${localeRegex}/account`,
    isPrivate: true,
    component: AsyncAccount
  },
  {
    path: `/${localeRegex}/policy`,
    isPrivate: true,
    component: AsyncPrivacyPolicy
  },
  {
    path: `/${localeRegex}/faqs`,
    isPrivate: true,
    component: AsyncFaqs
  },
  {
    path: `/${localeRegex}/contact-us`,
    isPrivate: true,
    component: AsyncContactUs
  },
  {
    path: `/${localeRegex}/transactions`,
    isPrivate: true,
    exact: true,
    component: AsyncTransactions
  },
  {
    path: `/${localeRegex}/transactions/:cardNo`,
    isPrivate: true,
    exact: true,
    component: AsyncTransactions
  },
  {
    path: `/${localeRegex}/transactions/:receiptNo/:autoID`,
    isPrivate: true,
    component: AsyncTransactionDetails
  },
  {
    path: `/${localeRegex}/cards`,
    isPrivate: true,
    exact: true,
    component: AsyncCards
  },
  {
    path: `/${localeRegex}/cards/transfer/:cardNo`,
    isPrivate: true,
    component: AsyncTransferBalance
  },
  {
    path: `/${localeRegex}/cards/add-card`,
    isPrivate: true,
    component: AsyncAddCard
  },
  {
    path: `/${localeRegex}/cards/report-loss/:cardNo`,
    isPrivate: true,
    component: AsyncReportLossPage
  },
  {
    path: `/${localeRegex}/cards/verify-gold-card-address`,
    isPrivate: true,
    component: AsyncVerifyGoldCardAddressPage
  },
  {
    path: `/${localeRegex}/cards/:cardNo`,
    isPrivate: true,
    component: AsyncCardDetails
  },
  {
    path: `/${localeRegex}/rewards`,
    isPrivate: true,
    component: AsyncRewards
  },
  {
    path: `/${localeRegex}/profile`,
    isPrivate: true,
    exact: true,
    component: AsyncProfile
  },
  {
    path: `/${localeRegex}/change-password`,
    isPrivate: true,
    component: AsyncChangePassword
  },
  {
    path: `/${localeRegex}/notifications`,
    isPrivate: true,
    component: AsyncNotifications
  },
  {
    path: `/${localeRegex}/about`,
    isPrivate: true,
    component: About
  }
];

const SharedRoutes = [
  {
    path: `/${localeRegex}/logout`,
    isPrivate: true,
    component: LogOut
  },
  {
    path: `/${localeRegex}`,
    exact: true,
    isPrivate: false,
    component: AsyncSignIn
  },
  {
    path: `/${localeRegex}/*`,
    isPrivate: false,
    status: 404,
    component: NotFound
  }
];

export { Routes, PrivateRoutes, SharedRoutes, localeRegex };
