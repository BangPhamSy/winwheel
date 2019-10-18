// General strings
import LangShare from "./general/LangShare"
import LangErrorMessage from "./general/LangErrorMessage"

// Modules string
import LangHeader from "./modules/LangHeader"
import LangSidebar from "./modules/LangSidebar"
import LangFooter from "./modules/LangFooter"
import LangMyAccount from "./modules/LangMyAccount"
import LangMyRewards from "./modules/LangMyRewards"
import LangMyTransactions from "./modules/LangMyTransactions"
import LangDefaultCardForm from "./modules/LangDefaultCardForm"
import LangIdleMonitor from "./modules/LangIdleMonitor"

// Pages strings
import LangSignIn from "./pages/LangSignIn"
import LangSignUp from "./pages/LangSignUp"
import LangForgotEmail from "./pages/LangForgotEmail"
import LangForgotPassword from "./pages/LangForgotPassword"
import LangResetPassword from "./pages/LangResetPassword"
import LangContactUs from "./pages/LangContactUs"
import LangChangePassword from "./pages/LangChangePassword"
import LangProfile from "./pages/LangProfile"
import LangUnregister from "./pages/LangUnregister"
import LangCardDetails from "./pages/LangCardDetails"
import LangCards from "./pages/LangCards"
import LangTransactionDetails from "./pages/LangTransactionDetails"
import LangAddCard from "./pages/LangAddCard"
import LangNotFound from "./pages/LangNotFound"
import LangTransferBalance from "./pages/LangTransferBalance"
import LangReportLostCard from "./pages/LangReportLostCard"
import LangModal from "./modules/LangModal"
import LangVerifyGoldCardAddress from "./pages/LangVerifyGoldCardAddress"
import LangAboutUs from "./pages/LangAboutUs"

var Translations = {}

// General strings
Translations = Object.assign(Translations, LangShare, LangErrorMessage)

// Modules strings
Translations = Object.assign(
	Translations,
	LangMyAccount,
	LangMyRewards,
	LangMyTransactions,
	LangDefaultCardForm,
	LangHeader,
	LangFooter,
	LangSidebar,
	LangIdleMonitor,
	LangModal
)

// Pages strings
Translations = Object.assign(
	Translations,
	LangSignIn,
	LangSignUp,
	LangForgotEmail,
	LangForgotPassword,
	LangContactUs,
	LangChangePassword,
	LangUnregister,
	LangProfile,
	LangCardDetails,
	LangCards,
	LangResetPassword,
	LangTransactionDetails,
	LangAddCard,
	LangNotFound,
	LangTransferBalance,
	LangReportLostCard,
	LangVerifyGoldCardAddress,
	LangAboutUs
)

export default Translations
