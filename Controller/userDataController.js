const userModel = require('../Models/userModel'); 

const getAllUsers = async (request, response) => {
    try {
        
        const user = await userModel.findOne({ email: request.userId }, 'firstName lastName');
        
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

       
        return response.status(200).json({ 
            firstName: user.firstName, 
            lastName: user.lastName 
        });
    } catch (error) {
        console.error("Error in getAllUsers:", error.message); // Log any error
        return response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers };
