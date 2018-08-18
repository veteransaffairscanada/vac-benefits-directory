import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const position = { coords: { latitude: 10, longitude: 10 } };
const mockGeolocation = {
  getCurrentPosition: async success => success(position)
};

global.navigator.geolocation = mockGeolocation;
