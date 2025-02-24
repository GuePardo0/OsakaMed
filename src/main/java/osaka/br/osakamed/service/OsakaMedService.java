package osaka.br.osakamed.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

import org.springframework.stereotype.Service;

import osaka.br.osakamed.model.Medico;
import osaka.br.osakamed.model.Usuario;
import osaka.br.osakamed.model.Consulta;

@Service
public class OsakaMedService {
    private ArrayList<Usuario> usuarios = new ArrayList<>();
    private ArrayList<Medico> medicos = new ArrayList<>();
    private ArrayList<Consulta> consultas = new ArrayList<>();

    public void adicionarUsuario(Usuario usuario) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            BufferedReader br = new BufferedReader(new FileReader(file));
            String linha = br.readLine();
            int id = 1;
            while (linha != null) {
                String[] partes = linha.split(";");
                id = Integer.parseInt(partes[0]) + 1;
                linha = br.readLine();
            }
            usuario.setId(id);
            bw.write(usuario.getId() + ";" + usuario.getNome() + ";" + usuario.getSenha() + ";" + usuario.getIdade() + ";" + usuario.getPlanoDeSaude() + "\n");
            this.usuarios.add(usuario);
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void adicionarMedico(Medico medico) {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(medico.getCRM() + ";" + medico.getNome() + ";" + medico.getSenha() + ";" + medico.getEspecialidade() + ";" + medico.getPlanoDeSaude() + "\n");
            this.medicos.add(medico);
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void agendarConsulta(Consulta consulta){
        File file = new File("src/main/java/osaka/br/osakamed/model/consulta.txt");
        try {
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            BufferedReader br = new BufferedReader(new FileReader(file));
            String linha = br.readLine();
            int id = 1;
            while (linha != null) {
                String[] partes = linha.split(";");
                id = Integer.parseInt(partes[0]) + 1;
                linha = br.readLine();
            }
            consulta.setId(id);
            bw.write(consulta.getId() + ";" + consulta.getIdUser() + ";" + consulta.getData() + ";" + consulta.getCRM() + ";" + ";" + consulta.getStatus() + "\n");
            bw.close();
            br.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void lerMedicos() {
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);

            ArrayList<Medico> medicos = new ArrayList<>();
            String linha = br.readLine();
            while (linha != null) {
                Medico medico = new Medico();
                String[] partes = linha.split(";");
                medico.setCRM(partes[0]);
                medico.setNome(partes[1]);
                medico.setSenha(partes[2]);
                medico.setEspecialidade(partes[3]);
                medico.setPlanoDeSaude(partes[4]);
                medicos.add(medico);
                linha = br.readLine();
            }
            this.medicos = medicos;

            br.close();
            fr.close();
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
            String linha = br.readLine();
            while (linha != null) {
                String[] partes = linha.split(";");
                Usuario usuario = new Usuario();
                usuario.setId(Integer.parseInt(partes[0]));
                usuario.setNome(partes[1]);
                usuario.setSenha(partes[2]);
                usuario.setIdade(Integer.parseInt(partes[3]));
                usuario.setPlanoDeSaude(partes[4]);
                usuarios.add(usuario);
                linha = br.readLine();
            }
            this.usuarios = usuarios;

            br.close();
            fr.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void lerConsultas(){
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/consultas.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);

            ArrayList<Consulta> consultas = new ArrayList<>();
            String linha = br.readLine();
            while (linha != null) {
                String[] partes = linha.split(";");
                Consulta consulta = new Consulta();
                consulta.setId(Integer.parseInt(partes[0]));
                consulta.setIdUser(Integer.parseInt(partes[1]));
                consulta.setData(partes[2]);
                consulta.setCRM(partes[3]);
                consulta.setStatus(partes[4]);
                consultas.add(consulta);
                linha = br.readLine();
            }
            this.consultas = consultas;

            br.close();
            fr.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void alterarPlano(Usuario usuario, String plano){
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.usuarios.size(); i++) {
                if (this.usuarios.get(i).getId() == usuario.getId()) {
                    this.usuarios.get(i).setPlanoDeSaude(plano);
                }
                bw.write(this.usuarios.get(i).getId() + ";" + this.usuarios.get(i).getNome() + ";" + this.usuarios.get(i).getSenha() + ";" + this.usuarios.get(i).getIdade() + ";" + this.usuarios.get(i).getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void alterarSenhaUser(Usuario usuario, String senha){
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.usuarios.size(); i++) {
                if (this.usuarios.get(i).getId() == usuario.getId()) {
                    this.usuarios.get(i).setSenha(senha);
                }
                bw.write(this.usuarios.get(i).getId() + ";" + this.usuarios.get(i).getNome() + ";" + this.usuarios.get(i).getSenha() + ";" + this.usuarios.get(i).getIdade() + ";" + this.usuarios.get(i).getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void alterarSenhaMed(Medico medico, String senha){
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (int i = 0; i < this.medicos.size(); i++) {
                if (Objects.equals(this.medicos.get(i).getCRM(), medico.getCRM())) {
                    this.medicos.get(i).setSenha(senha);
                }
                bw.write(this.medicos.get(i).getCRM() + ";" + this.medicos.get(i).getNome() + ";" + this.medicos.get(i).getSenha() + ";" + this.medicos.get(i).getEspecialidade() + ";" + this.medicos.get(i).getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void excluirUsuario(int id){
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/usuarios.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (Usuario usuario : this.usuarios) {
                if (usuario.getId() == id) {
                    this.usuarios.remove(usuario);
                    continue;
                }
                bw.write(usuario.getId() + ";" + usuario.getNome() + ";" + usuario.getSenha() + ";" + usuario.getIdade() + ";" + usuario.getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void excluirMedico(String CRM){
        try {
            File file = new File("src/main/java/osaka/br/osakamed/model/medicos.txt");
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            for (Medico medico : this.medicos) {
                if (Objects.equals(medico.getCRM(), CRM)) {
                    this.medicos.remove(medico);
                    continue;
                }
                bw.write(medico.getCRM() + ";" + medico.getNome() + ";" + medico.getSenha() + ";" + medico.getEspecialidade() + ";" + medico.getPlanoDeSaude() + "\n");
            }
            bw.close();
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void mostrarUsuarios() {
        for (int i = 0; i < this.usuarios.size(); i++) {
            System.out.println(usuarios.get(i).getNome());
        }
    }

    public ArrayList<Consulta> getConsultas() {
        return consultas;
    }

    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }

    public ArrayList<Medico> getMedicos() {
        return medicos;
    }
}