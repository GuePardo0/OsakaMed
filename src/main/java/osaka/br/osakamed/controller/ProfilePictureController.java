package osaka.br.osakamed.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@RestController
@RequestMapping("/profile")
public class ProfilePictureController {

    private static final String UPLOAD_DIR = "src/main/resources/static/assets/";

    @PostMapping("/upload/{type}/{identifier}")
    public String uploadProfilePicture(
            @PathVariable String type,       // "user" ou "medico"
            @PathVariable String identifier, // ID (para user) ou CRM (para medico)
            @RequestParam("file") MultipartFile file) {

        try {
            // Define o diretório baseado no tipo (user ou medico)
            String uploadPath = UPLOAD_DIR + type + "/"; // Ex: "uploads/users/" ou "uploads/doctors/"

            // Cria o diretório se não existir
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Gera o nome do arquivo
            String filename = type.equals("user") ? "user_" + identifier : "medico_" + identifier;
            filename += "_" + file.getOriginalFilename();

            // Salva o arquivo no diretório
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadPath + filename);
            Files.write(path, bytes);

            // Salva o caminho da foto no arquivo TXT ou banco de dados
            saveProfilePicturePath(type, identifier, path.toString());

            return "Foto de perfil atualizada com sucesso!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Falha ao atualizar a foto de perfil.";
        }
    }

    private void saveProfilePicturePath(String type, String identifier, String filePath) {
        // Aqui você pode salvar o caminho da foto no arquivo TXT ou banco de dados
        // Exemplo de como salvar em um arquivo TXT:
        try {
            String record = type + ":" + identifier + ":" + filePath + "\n";
            Files.write(Paths.get("profiles.txt"), record.getBytes(), StandardOpenOption.APPEND);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}