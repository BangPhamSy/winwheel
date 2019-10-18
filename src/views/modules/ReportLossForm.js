import React from "react"
import { Field, reduxForm, Form } from "redux-form"
// import CheckField from '../components/fields/CheckField';
import RadioButtonField from "../components/fields/RadioButtonField"

const formId = "report-loss"
class ReportLossForm extends React.Component {
	render() {
		return (
			<form id={formId}>
				<Field
					name={"isNewVirtualCard"}
					id={"physicalCard"}
					value={"false"}
					type={"radio"}
					component={RadioButtonField}
					label={`Physical Card collection at the store
                        ($5 replacement fee will be deducted from your balance)`}
				/>
				<Field
					name={"isNewVirtualCard"}
					id={"virtualCard"}
					value={"true"}
					type={"radio"}
					component={RadioButtonField}
					label={`Virtual Card added to your account
                        ($5 replacement fee will be deducted from your balance)`}
				/>
			</form>
		)
	}
}

export default reduxForm({
	form: formId,
	initialValues: { isNewVirtualCard: "true" },
	enableReinitialize: true,
	destroyOnUnmount: false,
})(ReportLossForm)
