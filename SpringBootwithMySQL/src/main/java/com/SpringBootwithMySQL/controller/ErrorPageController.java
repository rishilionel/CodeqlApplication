package com.SpringBootwithMySQL.controller;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.handler.DispatcherServletWebRequest;


/**
 * This is the error page handler for the HTTP Restful services.
 * 
 * @author 1000045286
 *
 */
@RestController
@RequestMapping("/error")
public class ErrorPageController implements ErrorController {

	private final ErrorAttributes errorAttributes;

	@Autowired
	public ErrorPageController(ErrorAttributes errorAttributes) {
		Assert.notNull(errorAttributes, "ErrorAttributes must not be null");
		this.errorAttributes = errorAttributes;
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}

	@RequestMapping
	public Map<String, Object> error(HttpServletRequest aRequest) {
		Map<String, Object> body = getErrorAttributes(aRequest, getTraceParameter(aRequest));
		String trace = (String) body.get("trace");
		if (trace != null) {
			String[] lines = trace.split("\n\t");
			body.put("trace", lines);
		}
		return body;
	}

	private boolean getTraceParameter(HttpServletRequest request) {
		String parameter = request.getParameter("trace");
		if (parameter == null) {
			return false;
		}
		return !"false".equals(parameter.toLowerCase());
	}

	private Map<String, Object> getErrorAttributes(HttpServletRequest aRequest, boolean includeStackTrace) {
		DispatcherServletWebRequest webRequest = new DispatcherServletWebRequest(aRequest);
		return errorAttributes.getErrorAttributes(webRequest, includeStackTrace);
	}
}