import { User } from '../models/user.model.js';

const DatabaseData = async (req, res) => {
    const data = await User.find({});
    return data;
}

export default DatabaseData;