import { Outlet } from 'react-router-dom';
const Centered = ({ children }) => (
  <>
    <head>
      <title>Automated Checklist</title>
    </head>
    <div
      data-layout="centered"
      className="w-full h-screen flex items-center justify-center bg-gray-50">
      <Outlet/>
    </div>
  </>
);

export default Centered;
