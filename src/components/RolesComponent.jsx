import { useContext } from "react";
import { DataContext } from "../App";

const RolesComponent = () => {
  const { roles } = useContext(DataContext);

  return (
    <div>
      <h2>Роли:</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
};

export default RolesComponent;