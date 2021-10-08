import { RegularList } from "./RegularList";
import { SplitScreen } from "./SplitScreen";
import { SmallPersonListItem } from "./people/SmallPersonListItem";
import { LargePersonListItem } from "./people/LargePersonListItem";
import { SmallProductListItem } from "./products/SmallProductListItem";
import { NumberedList } from "./NumberedList";
import { LargeProductListItem } from "./products/LargeProductListItem";
import { Modal } from "./Modal";
import { CurrentUserLoader } from "./CurrentUserLoader";
import { UserLoader } from "./UserLoader";
import { UserInfo } from "./UserInfo";
import { ResourceLoader } from "./ResourceLoader";
import { ProductInfo } from "./ProductInfo";
import { DataSource } from "./DataSource";
import axios from "axios";
import { UnControlledFormComponent } from "./UncontrolledFormComponent";
import { ControlledFormComponent } from "./ControlledFormComponent";
import { useState } from "react";
import { ControlledModal } from "./ControlledModal";
import { UncontrolledOnboardingFlow } from "./UncontrolledOnboardingFlow";
import { ControlledOnboardingFlow } from "./ControlledOnboardingFlow";
import { printPropsHoc } from "./printPropsHOC";
import { withUser } from "./withUser";
import { UserInfoForm } from "./UserInfoForm";
import { UserInfoFormUsingResource } from "./UserInfoFormUsingResource";
import { useCurrentUser } from "./useCurrentUser";
import { useUser } from "./useUser";
import { useResource } from "./useResource";
import { useDataSource } from "./useDataSource";
import { RecursiveComponent } from "./RecursiveComponent";
import { BigSuccessButton, DangerButton } from "./composition";
import {
  BigSuccessButtonPartiallyAppied,
  DangerButtonPartiallyAppied,
} from "./partiallyApplyHoc";

const LeftHandComponent = ({ name }) => {
  return <h1 style={{ backgroundColor: "green" }}>{name}</h1>;
};

const RightHandComponent = ({ name }) => {
  return <h1 style={{ backgroundColor: "red" }}>{name}</h1>;
};

const people = [
  {
    name: "John Doe",
    age: 54,
    hairColor: "brown",
    hobbies: ["swimming", "bicycling", "video games"],
  },
  {
    name: "Brenda Smith",
    age: 33,
    hairColor: "black",
    hobbies: ["golf", "mathematics"],
  },
  {
    name: "Jane Garcia",
    age: 27,
    hairColor: "blonde",
    hobbies: ["biology", "medicine", "gymnastics"],
  },
];

const products = [
  {
    name: "Flat-Screen TV",
    price: "$300",
    description: "Huge LCD screen, a great deal",
    rating: 4.5,
  },
  {
    name: "Basketball",
    price: "$10",
    description: "Just like the pros use",
    rating: 3.8,
  },
  {
    name: "Running Shoes",
    price: "$120",
    description: "State-of-the-art technology for optimum running",
    rating: 4.2,
  },
];

const nestedObject = {
  a: 1,
  b: {
    b1: 4,
    b2: {
      b23: "Hello",
    },
    b3: {
      b31: {
        message: "Hi",
      },
      b32: {
        message: "Hi",
      },
    },
  },
  c: {
    c1: 2,
    c2: 3,
  },
};

const getServerData = (url) => async () => {
  const response = await axios.get(url);
  return response.data;
};

const getLocalStorageData = (key) => () => {
  return localStorage.getItem(key);
};

const Text = ({ message }) => <p>{message}</p>;

const Step1 = ({ goToNext }) => (
  <>
    <h1>Step 1</h1>
    <button onClick={() => goToNext({ name: "John Doe" })}>Next</button>
  </>
);

const Step2 = ({ goToNext }) => (
  <>
    <h1>Step 2</h1>
    <button onClick={() => goToNext({ age: 28 })}>Next</button>
  </>
);

const Step3 = ({ goToNext }) => (
  <>
    <h1>Step 3</h1>
    <button onClick={() => goToNext({ hairColor: "Gray" })}>Next</button>
  </>
);

const UserInfoWrapped = printPropsHoc(UserInfo);

const UserInfoWithLoader = withUser(UserInfo, "123");

function App() {
  const [onBoardingData, setOnBoardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUserFromCustomHook = useCurrentUser();
  const userFromHook = useUser("234");

  const userResourceFromHook = useResource("users/345");
  const productResourceFromHook = useResource("products/1234");

  const userFromDataSourceHook = useDataSource(async () => {
    const response = await axios.get("users/123");
    return response.data;
  });

  const productFromDataSourceHook = useDataSource(async () => {
    const response = await axios.get("products/2345");
    return response.data;
  });

  const onNext = (stepData) => {
    const nextIndex = currentIndex + 1;
    setOnBoardingData({ ...onBoardingData, ...stepData });
    setCurrentIndex(nextIndex);
  };

  const [shouldShowModal, setShouldShowModal] = useState(false);
  return (
    <>
      <SplitScreen leftWeight={1} rightWeight={2}>
        <LeftHandComponent name="Ayush" />
        <RightHandComponent name="Maheshwari" />
      </SplitScreen>

      <RegularList
        items={people}
        resourceName="person"
        itemComponent={SmallPersonListItem}
      />

      <NumberedList
        items={people}
        resourceName="person"
        itemComponent={LargePersonListItem}
      />

      <RegularList
        items={products}
        resourceName="product"
        itemComponent={SmallProductListItem}
      />

      <NumberedList
        items={products}
        resourceName="product"
        itemComponent={LargeProductListItem}
      />

      <Modal>
        <LargeProductListItem product={products[0]} />
      </Modal>

      <h1>Server Operation using Specific User Loader</h1>
      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>

      <h1>Server Operation using Generic User Loader</h1>
      <UserLoader userId="234">
        <UserInfo />
      </UserLoader>

      <UserLoader userId="345">
        <UserInfo />
      </UserLoader>

      <h1>Server Operation using Generic resource Loader</h1>
      <ResourceLoader resourceName="user" resourceUrl="users/123">
        <UserInfo />
      </ResourceLoader>

      <ResourceLoader resourceName="product" resourceUrl="products/1234">
        <ProductInfo />
      </ResourceLoader>

      <h1>Server Operation using Generic DataSource</h1>
      <DataSource getDataFunc={getServerData("users/234")} resourceName="user">
        <UserInfo />
      </DataSource>
      <h1>Local Storage Operation using Generic DataSource</h1>
      <DataSource
        getDataFunc={getLocalStorageData("messge")}
        resourceName="message"
      >
        <Text />
      </DataSource>

      <h1>Uncontroller Component</h1>
      <UnControlledFormComponent />

      <h1>Controlled Component</h1>
      <ControlledFormComponent />
      <br></br>
      <ControlledModal
        shouldShow={shouldShowModal}
        onRequestClose={() => setShouldShowModal(false)}
      >
        <h1>Controlled Modal</h1>
      </ControlledModal>
      <button onClick={() => setShouldShowModal(!shouldShowModal)}>
        {shouldShowModal ? "Hide Modal" : "Show Modal"}
      </button>

      <h1>UnControlled Onboarding Flow</h1>
      <UncontrolledOnboardingFlow
        onFinished={(data) => {
          console.log(data);
          alert("Onboarding Completed!");
        }}
      >
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledOnboardingFlow>

      <h1>Controlled Onboarding Flow</h1>
      <ControlledOnboardingFlow currentIndex={currentIndex} onNext={onNext}>
        <Step1 />
        <Step2 />
        <Step3 />
      </ControlledOnboardingFlow>

      <h1>Higher order Components</h1>
      <UserInfoWrapped a={1} b="Hello" c={{ nbame: "Ayush" }} />

      <h1>User Info loaded from server using HOC</h1>
      <UserInfoWithLoader />

      <h1>Modifying user with HOC</h1>
      <UserInfoForm />

      <h1>Modifying user with HOC Generic Resource</h1>
      <UserInfoFormUsingResource userId="2233" />

      <h1>Current User details using Custom hook</h1>
      <UserInfo user={currentUserFromCustomHook} />

      <h1>Specific User details using Custom hook</h1>
      <UserInfo user={userFromHook} />

      <h1>Generic Resource loader using Custom hook</h1>
      <UserInfo user={userResourceFromHook} />
      <ProductInfo product={productResourceFromHook} />

      <h1>Generic data Source loader using Custom hook</h1>
      <UserInfo user={userFromDataSourceHook} />
      <ProductInfo product={productFromDataSourceHook} />

      <h1>Recusive Component</h1>
      <RecursiveComponent data={nestedObject} />

      <h1>Composite Component</h1>
      <DangerButton text="Don't do it!" />
      <BigSuccessButton text="Success" />

      <h1>Partially Applied Component</h1>
      <DangerButtonPartiallyAppied text="Don't do it!" />
      <BigSuccessButtonPartiallyAppied text="Success" />
    </>
  );
}

export default App;
