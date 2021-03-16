const getters = {
    user(state) {
      return {
        ...state.user,
        ...state.userProfile, // たとえば state.user.photoURL を state.userProfile.photoURL で上書きできる
      }
    },
    // ...
  }