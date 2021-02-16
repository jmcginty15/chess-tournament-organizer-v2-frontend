export const checkMember = (user, team) => {
    for (let member of team.members) {
        if (user.username === member.player) return true;
    }
    return false;
}