export const getMyTeam = (teams, myUserId) => {
  if (!teams || !myUserId) return;

  return teams.find((team) => team.members.find((mem) => mem._id === myUserId));
};
export const getNextSpeakTeam = (teams, debateStartedTeam, roundShot) => {
  if (!teams || !debateStartedTeam || !roundShot) return;

  let teamsName = teams.map((team) => team.name);
  if (Math.floor(roundShot % 2) === 0) {
    let nextTeam = teamsName.find((team) => team !== debateStartedTeam);
    return nextTeam;
  } else {
    return debateStartedTeam;
  }
};

export const setLoggedInUserData = (userData) => {
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

export const getLoggedInUserData = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeLoggedInUserData = () => {
  localStorage.removeItem("user");
};
