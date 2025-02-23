package osaka.br.osakamed.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import osaka.br.osakamed.model.Medico;
import osaka.br.osakamed.model.Usuario;
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
    }

    @PostMapping
    public ResponseEntity<Void> adicionarUsuario(@RequestBody Usuario usuario) {
        server.adicionarUsuario(usuario);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getusuarios")
    public ArrayList<Usuario> getUsuarios() {
        return server.getUsuarios();
    }

    @GetMapping("/getmedicos")
    public ArrayList<Medico> getMedicos() {
        return server.getMedicos();
    }
}