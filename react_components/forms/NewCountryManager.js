import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import { MainDeployed } from "../../ethereum/deployedContractCalls/deployedContracts";
import web3 from "../../ethereum/web3";
import GetListOfCountryManagers from "../../ethereum/deployedContractCalls/main/getListOfCountryManagers";
import CreateNewCountryManger from "../../ethereum/deployedContractCalls/main/createNewCountryManager";
import {
  mainContractAddress,
  owner
} from "../../ethereum/ListofSmartContractAddresses";
import {
  GetCountryManagerSummary,
  GetSchoolSummary
} from "../../ethereum/deployedContractCalls/getContractSummary";
import GetSummaryOfAllSchoolsInCountry from "../../ethereum/deployedContractCalls/countryManager/getSummaryOfAllSchoolsInCountry";
import GetSummaryOfAllISPsInCountry from "../../ethereum/deployedContractCalls/countryManager/getSummaryOfAll_ISPsInCountry";

const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
const countryManagersList = [];
//let summary;

class RegistrationForm extends React.Component {
  state = {
    countryName: "",
    confirmDirty: false,
    autoCompleteResult: [],
    errorMessage: ""
  };

  async componentDidMount() {}

  //creates a new country manager
  createNewCountryM = async e => {
    e.preventDefault();
    try {
      let result = await MainDeployed(mainContractAddress);

      let address = await CreateNewCountryManger(
        mainContractAddress,
        this.state.countryName
      );

      console.log(address);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
  };

  //retrieves a list of created country managers
  getListOfCountryManagers = async e => {
    e.preventDefault();
    try {
      let result = await GetListOfCountryManagers(mainContractAddress);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };

  getCountryManagersSummary = async e => {
    e.preventDefault();
    try {
      //gets a list of country managers
      let result = await GetListOfCountryManagers(mainContractAddress);
      //the first country oin the away is Nigeria
      const countryManagerNigeria = result[0];
      //get the summary of the contract manager of Nigeria
      const countryManagerNigeriaSummary = await GetCountryManagerSummary(
        countryManagerNigeria
      );
      // //get summary of all schools under the contract manager of Nigeria
      // const schoolSummary = await GetSummaryOfAllSchoolsInCountry(
      //   countryManagerNigeriaSummary
      // );
      // //get summary of all ISP under the contract manager of Nigeria
      // const ISPSummary = await GetSummaryOfAllISPsInCountry(
      //   countryManagerNigeriaSummary
      // );

      // console.log(schoolSummary);
      // console.log(ISPSummary);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "234"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <div>
        <h1> Welcome Admin! </h1>
        <br />
        <br />
        <h4> Address: {this.state.address}</h4>
        <Button type="primary" onClick={this.getListOfCountryManagers}>
          Get List of Country Managers
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.getCountryManagersSummary}>
          Get getCountryManagersSummary
        </Button>
        <Form
          onSubmit={this.createNewCountryM}
          style={{ padding: "50px 100px" }}
        >
          <h4> Add new Country Manager </h4>
          <Form.Item label="Country Name">
            <Input
              value={this.state.countryName}
              onChange={event =>
                this.setState({ countryName: event.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Additional Details">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;