import User from '../models/user'

export const getAll = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json({
            message: "Get all users successfully",
            data: users
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id })
        res.status(200).json({
            message: "Get user successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error'

        })
    }
}
export const create = async (req, res) => {
    try {
        const body = req.body;
        const user = await new User(body).save();
        res.status(200).json({
            message: "Create user successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: error

        })
    }
}
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const user = await User.findOneAndUpdate({ _id: id }, body, { new: true })
        res.status(200).json({
            message: "Update user successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error'

        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOneAndDelete({ _id: id })
        res.status(200).json({
            message: "Delete user successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}