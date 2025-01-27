import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        
        mongoose.connection.on('connected', () => {
            console.log(' MongoDB connecté avec succès');
        });

        mongoose.connection.on('error', (err) => {
            console.error(' Erreur MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log(' MongoDB déconnecté');
        });


        // Tentative de connexion
        await mongoose.connect(`${process.env.MONGODB_URI}/melliCouture`);

    } catch (error) {
        console.error(' Erreur de connexion:', error);
        process.exit(1); // Arrête l'application en cas d'échec de connexion
    }
};

// Gestion  de la déconnexion lors de l'arrêt de l'application
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB déconnecté lors de l\'arrêt de l\'app');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        process.exit(1);
    }
});

export default connectDB;