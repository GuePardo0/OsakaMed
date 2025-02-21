package osaka.br.osakamed.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import osaka.br.osakamed.model.Usuario;

@Service
public class OsakaMedService {
    private ArrayList<Usuario> usuarios = new ArrayList<>();

    public void adicionarUsuario(Usuario usuario) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(usuario.getNome() + ";" + usuario.getSenha() + ";" + usuario.getIdade() + ";" + usuario.getPlanoDeSaude() + "\n");
            this.usuarios.add(usuario);
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void lerUsuarios() {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);

            ArrayList<Usuario> usuarios = new ArrayList<>();
            Usuario usuario = new Usuario(0, null, null, 0, null);
            String linha = br.readLine();
            do {
                String[] partes = linha.split(";");
                usuario.setId(Integer.parseInt(partes[0]));
                usuario.setNome(partes[1]);
                usuario.setSenha(partes[2]);
                usuario.setIdade(Integer.parseInt(partes[3]));
                usuario.setPlanoDeSaude(partes[4]);
                usuarios.add(usuario);
                linha = br.readLine();
            } while(linha != null);
            this.usuarios = usuarios;

            br.close();
            fr.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void mostrarUsuarios() {
        for (int i = 0; i < this.usuarios.size(); i++) {
            System.out.println(usuarios.get(i).getNome());
        }
    }

    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }
}
