const actions = {
    // ログイン状態が変化するときに呼び出す
    setUserAndProfile({ commit }, { user, userProfile }) {
      commit("setUser", user)
      commit("setUserProfile", userProfile)
    },
    // ユーザーの情報を更新するときに呼び出す
    updateUserProfile({ state, commit }, userProfileDiff) {
      // Diff = Difference
      const userProfile = {
        ...state.userProfile,
        ...userProfileDiff,
      }
      if (state.user) {
        return db
          .collection("user_profiles")
          .doc(state.user.uid)
          .set(userProfile)
          .then(() => {
            commit("setUserProfile", userProfile)
          })
      }
    },
  }