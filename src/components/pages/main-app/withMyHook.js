import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from "../../../service/firebase/fbContext";

export function withMyHook(Component) {
    return function WrappedComponent(props) {
      const authUser= useContext(FirebaseContext);
      return <Component {...props} authUser={authUser} />;
    }
}
