import { useState } from "react";

function useRole() {
  const [role] = useState(() => {
    return localStorage.getItem("userRole") || "student";
  });

  return role;
}

export default useRole;
