export const checkMember = (user, team) => {
    /** Check if a user is a member of a team */
    for (let member of team.members) {
        if (user.username === member.player) return true;
    }
    return false;
}