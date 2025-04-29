const execSync = require('child_process').execSync;
const fs = require('fs');
let packageFile = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

/* --- */
let dockerImage = `eopires/${packageFile.name}:${packageFile.version}`;

try {
  console.log(`---- Criando Versão ${packageFile.version} ----`);

  execSync(`docker build -f Dockerfile.prod -t ${dockerImage} .`, { stdio: 'inherit' });
  console.log(`---- docker build created ----`);

  execSync(`docker push ${dockerImage}`, { stdio: 'inherit' });
  console.log('---- docker push sended---- ');

  console.log('---- Versão Gerada ----');
} catch (e) {
  console.log(`Erro: ${e.message}`);
}
