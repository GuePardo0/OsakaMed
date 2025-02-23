package osaka.br.osakamed.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/osakamed")
public class OsakaMedController {
	@GetMapping("/")
	public String index() {
		return "osakamed";
	}

	@GetMapping("/especialistas")
	public String especialistas() {
		return "especialistas";
	}

	@GetMapping("/consultas")
	public String consultas() {
		return "consultas";
	}

	@GetMapping("/planos")
	public String planos() {
		return "planos";
	}

	@GetMapping("/minhas-consultas")
	public String minhasConsultas() {
		return "minhas-consultas";
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/perfil")
	public String perfil() {
		return "perfil";
	}

	@GetMapping("/consultas-do-dia")
	public String consultasDoDia() {
		return "consultas-do-dia";
	}

	@GetMapping("/minhas-avaliacoes")
	public String minhasAvaliacoes() {
		return "minhas-avaliacoes";
	}
}
