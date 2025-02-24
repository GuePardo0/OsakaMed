package osaka.br.osakamed.controller;

import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import osaka.br.osakamed.model.Medico;
import osaka.br.osakamed.model.Usuario;
import osaka.br.osakamed.model.Consulta;
import osaka.br.osakamed.service.OsakaMedService;

@RestController
@RequestMapping("/api/osakamed")
public class OsakaMedRestController {
    private final OsakaMedService server;

    @Autowired
    public OsakaMedRestController(OsakaMedService server) {
        this.server = server;
        server.lerUsuarios();
        server.lerMedicos();
        server.lerConsultas();
    }

    @GetMapping("/get-usuarios")
    public ArrayList<Usuario> getUsuarios() {
        return server.getUsuarios();
    }

    @GetMapping("/get-medicos")
    public ArrayList<Medico> getMedicos() {
        return server.getMedicos();
    }

    @GetMapping("/get-consultas")
    public ArrayList<Consulta> getConsultas() {
        return server.getConsultas();
    }

    @PostMapping("/add-usuario")
    public ResponseEntity<Void> adicionarUsuario(@RequestBody Usuario usuario) {
        server.adicionarUsuario(usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-medico")
    public ResponseEntity<Void> adicionarMedico(@RequestBody Medico medico) {
        server.adicionarMedico(medico);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-consulta")
    public ResponseEntity<Void> adicionarConsulta(@RequestBody Consulta consulta) {
        server.agendarConsulta(consulta);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/enviar-descricao-consulta")
    public ResponseEntity<Void> enviarDescricaoConsulta(@RequestBody Map<String, Object> payload) {
        String descricao = (String) payload.get("descricao");
        int idConsulta = (int) payload.get("id_consulta");
        server.enviarDescricaoConsulta(descricao, idConsulta);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/alterar-plano")
    public ResponseEntity<Void> alterarPlano(@RequestBody Map<String, Object> payload) {
        int id_usuario = (int) payload.get("id");
        String plano = (String) payload.get("plano");
        ArrayList<Usuario> usuarios = server.getUsuarios();
        Usuario usuario = new Usuario();
        for (int i = 0; i < usuarios.size(); i++) {
            if (usuarios.get(i).getId() == id_usuario) {
                usuario = usuarios.get(i);
                break;
            }
        }
        server.alterarPlano(usuario, plano);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/alterar-senha")
    public ResponseEntity<Void> alterarSenha(@RequestBody Map<String, Object> payload) {
        boolean isMedico = (boolean) payload.get("is_medico");
        if (isMedico) {
            int CRM_medico = (int) payload.get("id");
            String senha = (String) payload.get("nova_senha");
            ArrayList<Medico> medicos = server.getMedicos();
            Medico medico = new Medico();
            for (int i = 0; i < medicos.size(); i++) {
                if (Integer.parseInt(medicos.get(i).getCrm()) == CRM_medico) {
                    medico = medicos.get(i);
                    break;
                }
            }
            server.alterarSenhaMed(medico, senha);
        } else {
            int id_usuario = (int) payload.get("id");
            String senha = (String) payload.get("nova_senha");
            ArrayList<Usuario> usuarios = server.getUsuarios();
            Usuario usuario = new Usuario();
            for (int i = 0; i < usuarios.size(); i++) {
                if (usuarios.get(i).getId() == id_usuario) {
                    usuario = usuarios.get(i);
                    break;
                }
            }
            server.alterarSenhaUser(usuario, senha);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/excluir-conta")
    public ResponseEntity<Void> excluirConta(@RequestBody Map<String, Object> payload) {
        boolean isMedico = (boolean) payload.get("is_medico");
        if (isMedico) {
            String CRM_medico = (String) payload.get("id");
            server.excluirMedico(CRM_medico);
        } else {
            int id_usuario = (int) payload.get("id");
            server.excluirUsuario(id_usuario);
        }
        return ResponseEntity.ok().build();
    }
}