function sha1(input) {
    console.log(`SHA-1 hash of: ${input}`);
    return input.split('').reverse().join('');
}
function hmac(key, message) {
    console.log(`HMAC with key ${key} on message ${message}`);
    return key.substring(0, 3) + message.substring(0, 3);
}
function pbkdf2(password, salt, iterations) {
    console.log(`Deriving key from password and salt: ${salt}, iterations: ${iterations}`);
    let derivedKey = password + salt;
    for (let i = 0; i < iterations; i++) {
        derivedKey = sha1(derivedKey);
    }
    return derivedKey;
}
class ScramSha1Client {
    constructor(username, password, clientNonce) {
        this.serverNonce = '';
        this.salt = '';
        this.iterations = 0;
        this.derivedKey = '';
        this.username = username;
        this.password = password;
        this.clientNonce = clientNonce;
    }
    generateClientFirstMessage() {
        console.log("Client: Début de l'authentification");
        return {
            username: this.username,
            clientNonce: this.clientNonce,
        };
    }
    handleServerFirstMessage(message) {
        console.log('Client: Réception du message du serveur');
        this.serverNonce = message.serverNonce;
        this.salt = message.salt;
        this.iterations = message.iterationCount;
        this.derivedKey = pbkdf2(this.password, this.salt, this.iterations);
        console.log(`Client: Clé dérivée: ${this.derivedKey}`);
        const authMessage = `${this.clientNonce},${this.serverNonce},${this.username}`;
        console.log(`Client: Message d'authentification: ${authMessage}`);
        const clientProof = hmac(this.derivedKey, authMessage);
        console.log(`Client: Preuve calculée: ${clientProof}`);
        return {
            clientProof: clientProof,
        };
    }
    verifyServerSignature(message) {
        console.log('Client: Vérification de la signature du serveur');
        const expectedSignature = hmac(this.derivedKey, 'server-key');
        const isValid = expectedSignature === message.serverSignature;
        console.log(`Client: Authentification ${isValid ? 'réussie' : 'échouée'}`);
        return isValid;
    }
}
class ScramSha1Server {
    constructor(serverNonce) {
        this.currentUsername = '';
        this.clientNonce = '';
        this.serverNonce = '';
        this.derivedKey = '';
        this.userDatabase = new Map();
        this.serverNonce = serverNonce;
        const alicePassword = 'MonMotDePasse123';
        const aliceSalt = 'sel123';
        const iterations = 4096;
        const aliceKey = pbkdf2(alicePassword, aliceSalt, iterations);
        this.userDatabase.set('alice', {
            storedKey: aliceKey,
            salt: aliceSalt,
            iterations: iterations,
        });
    }
    handleClientFirstMessage(message) {
        console.log('Serveur: Réception du message initial du client');
        this.currentUsername = message.username;
        this.clientNonce = message.clientNonce;
        const userData = this.userDatabase.get(this.currentUsername);
        if (!userData) {
            throw new Error('Utilisateur non trouvé');
        }
        return {
            serverNonce: this.serverNonce,
            salt: userData.salt,
            iterationCount: userData.iterations,
        };
    }
    verifyClientProof(message) {
        console.log('Serveur: Vérification de la preuve du client');
        const userData = this.userDatabase.get(this.currentUsername);
        if (!userData) {
            throw new Error('Utilisateur non trouvé');
        }
        this.derivedKey = userData.storedKey;
        const authMessage = `${this.clientNonce},${this.serverNonce},${this.currentUsername}`;
        console.log(`Serveur: Message d'authentification: ${authMessage}`);
        const expectedProof = hmac(this.derivedKey, authMessage);
        const isValid = expectedProof === message.clientProof;
        console.log(`Serveur: Vérification ${isValid ? 'réussie' : 'échouée'}`);
        const serverSignature = hmac(this.derivedKey, 'server-key');
        return {
            serverSignature: serverSignature,
            success: isValid,
        };
    }
}
function demonstrateScramSha1() {
    console.log('=== DÉMONSTRATION DU PROTOCOLE SCRAM-SHA-1 ===');
    const client = new ScramSha1Client('alice', 'MonMotDePasse123', 'a1b2c3d4e5f6');
    const server = new ScramSha1Server('98f7e6d5c4b3a2');
    const clientFirstMessage = client.generateClientFirstMessage();
    console.log('Message 1 (Client → Serveur):', clientFirstMessage);
    const serverFirstMessage = server.handleClientFirstMessage(clientFirstMessage);
    console.log('Message 2 (Serveur → Client):', serverFirstMessage);
    const clientFinalMessage = client.handleServerFirstMessage(serverFirstMessage);
    console.log('Message 3 (Client → Serveur):', clientFinalMessage);
    const serverFinalMessage = server.verifyClientProof(clientFinalMessage);
    console.log('Message 4 (Serveur → Client):', serverFinalMessage);
    const authSuccess = client.verifyServerSignature(serverFinalMessage);
    console.log('=== RÉSULTAT ===');
    console.log(`Authentification ${authSuccess ? 'RÉUSSIE' : 'ÉCHOUÉE'}`);
}
demonstrateScramSha1();
//# sourceMappingURL=t.js.map