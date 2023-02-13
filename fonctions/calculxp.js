module.exports = async (xp, level) => {

    let xptotal = 0;
    for(let i = 0; i < level; i++) xptotal += parseInt((level + 1) * 1000)
    xptotal += xp;
    return xptotal;
}