/**
 * @apiName Registration
 * @apiGroup User
 *
 * @api {post} /user/registration Request User information
 *
 * @apiParam {String} login Users unique login.
 * @apiParam {String} password Users unique password.
 * @apiParam {String} confirmPassword Confirm password.
 *
 * @apiBody {String} login Users unique login.
 * @apiBody {String} password Users unique password.
 * @apiBody {String} confirmPassword Confirm password.
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {String} message  Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"success": true,
 *			"message": "New user registered."
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *       	"success": false,
 *       	"message": "Passwords must match. "
 *     }
 */
