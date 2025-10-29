// User data management utilities for localStorage

export const userStorage = {
  // Get user profile from localStorage
  getUserProfile: () => {
    try {
      const userData = localStorage.getItem("userProfile");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error reading user profile from localStorage:", error);
      return null;
    }
  },

  // Save user profile to localStorage
  saveUserProfile: (userProfile) => {
    try {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      return true;
    } catch (error) {
      console.error("Error saving user profile to localStorage:", error);
      return false;
    }
  },

  // Get survey answers from localStorage
  getSurveyAnswers: () => {
    try {
      const surveyData = localStorage.getItem("surveyAnswers");
      return surveyData ? JSON.parse(surveyData) : null;
    } catch (error) {
      console.error("Error reading survey answers from localStorage:", error);
      return null;
    }
  },

  // Save survey answers to localStorage
  saveSurveyAnswers: (surveyAnswers) => {
    try {
      const surveyData = {
        ...surveyAnswers,
        completedAt: Date.now()
      };
      localStorage.setItem("surveyAnswers", JSON.stringify(surveyData));
      return true;
    } catch (error) {
      console.error("Error saving survey answers to localStorage:", error);
      return false;
    }
  },

  // Check if user has completed survey
  hasCompletedSurvey: () => {
    const surveyData = userStorage.getSurveyAnswers();
    const userProfile = userStorage.getUserProfile();
    return !!(surveyData && userProfile?.hasCompletedSurvey);
  },

  // Clear survey data (for retaking)
  clearSurveyData: () => {
    try {
      localStorage.removeItem("surveyAnswers");
      
      // Update user profile to mark survey as incomplete
      const userProfile = userStorage.getUserProfile();
      if (userProfile) {
        const updatedProfile = {
          ...userProfile,
          hasCompletedSurvey: false
        };
        userStorage.saveUserProfile(updatedProfile);
      }
      return true;
    } catch (error) {
      console.error("Error clearing survey data:", error);
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem("isAuthenticated") === "true";
  },

  // Set authentication state
  setAuthenticated: (isAuth) => {
    localStorage.setItem("isAuthenticated", isAuth ? "true" : "false");
  },

  // Clear all user data (for logout with data removal)
  clearUserData: () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("surveyAnswers");
    localStorage.removeItem("isAuthenticated");
  },

  // Check if user exists by email
  userExists: (email) => {
    const userData = userStorage.getUserProfile();
    return userData && userData.email === email;
  },

  // Get complete user data (profile + survey)
  getCompleteUserData: () => {
    return {
      profile: userStorage.getUserProfile(),
      survey: userStorage.getSurveyAnswers(),
      isAuthenticated: userStorage.isAuthenticated(),
      hasCompletedSurvey: userStorage.hasCompletedSurvey()
    };
  }
};
