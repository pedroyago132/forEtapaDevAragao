import * as React from "react";
import { Link, useNavigate } from 'react-router-dom'


export default function LogOut() {
    const navigate = useNavigate();

  return (
     <>
      {navigate('/')}
     </>
  );
}
