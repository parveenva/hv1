import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import FormContent from "./FormContent"; // Import the modified FormContent component
import Link from "next/link";

const Register = () => {
  const [activeTab, setActiveTab] = useState(0); // Keep track of the active tab index (0 for Candidate, 1 for Employer)

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="form-inner">
      <h3>Create a Free Account</h3>

      <Tabs onSelect={handleTabSelect}>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          {activeTab === 0 && <FormContent role="candidate" />} {/* Pass role="candidate" for the Candidate tab */}
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          {activeTab === 1 && <FormContent role="employer" />} {/* Pass role="employer" for the Employer tab */}
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            href="#"
            className="call-modal login"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            data-bs-target="#loginPopupModal"
          >
            LogIn
          </Link>
        </div>
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register;
