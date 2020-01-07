/***
 * App common exception base (for now)
 * @param {string} message
 * @constructor
 */
export const JobResumeException = function (message) {
    this.name = "JobResumeException";
    this.message = message;
};