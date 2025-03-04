import "reflect-metadata";
import { AppDataSource } from "./data_source";
import { SpotifyService } from "./services/SpotifyService";
import { YoutubeService } from "./services/YoutubeService";

const main = async () => {
    console.log(process.env.DB_HOST);
    try {
        await AppDataSource.initialize();
        console.log("Connexion à la base de données établie.");

        const spotifyService = new SpotifyService();
        await spotifyService.insertDailyMetrics("Ado");
        console.log("Les métriques Spotify ont été insérées avec succès.");

        const youtubeService = new YoutubeService();
        await youtubeService.insertDailyMetrics("Ado");
        console.log("Les métriques YouTube ont été insérées avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'exécution :", error);
    } finally {
        process.exit();
    }
};

main();
