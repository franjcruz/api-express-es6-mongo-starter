import Request from '../models/request';

/**
 * Create new request.
 *
 * @param  {Object}  data
 * @return {Promise}
 */
export async function createRequest(data) {
  let request = new Request();

  request.tx_id = data.tx_id;
  request.cryptocurrency = data.cryptocurrency;
  request.confirmations = data.confirmations;
  request.webhook = data.webhook;

  return await request.save();

  // return Request.findOne({appClientName: appClientNameP, walletInstanceName: walletInstanceNameP}).sort({dateInit: -1}).exec();
}
