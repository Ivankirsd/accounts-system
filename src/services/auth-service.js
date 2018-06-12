module.exports = {
    loggedIn: true,


login: function() {
      this.loggedIn = true
    },

    logout: function() {
        this.loggedIn = false
    },

    getLoginState: function() {
        return this.loggedIn;
    },

}