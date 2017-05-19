package com.tree.view.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="categoria")
public class Categoria {
	
	public Categoria(){}
	
	public Categoria(String descricaoCategoria, Integer idPaiCategoria, String observacaoCategoria, Integer statusCategoria){
		this.descricaoCategoria = descricaoCategoria;
		this.idPaiCategoria = idPaiCategoria;
		this.statusCategoria = statusCategoria;
		this.observacaoCategoria = observacaoCategoria;
	}
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idCategoria;
	
	@Column
	@NotNull
	private String descricaoCategoria;
	
	@Column(name = "id_pai_categoria", nullable = false, columnDefinition="int default 0")
	private int idPaiCategoria;
	
	@Column
	@NotNull
	private String codigoCategoria;
	
	@Column(name = "status_categoria", nullable = false, columnDefinition = "int default 1")
	private int statusCategoria;
	
	@Column
	private String observacaoCategoria;

	public String getDescricaoCategoria() {
		return descricaoCategoria;
	}

	public void setDescricaoCategoria(String descricaoCategoria) {
		this.descricaoCategoria = descricaoCategoria;
	}

	public String getCodigoCategoria() {
		return codigoCategoria;
	}

	public void setCodigoCategoria(String codigoCategoria) {
		this.codigoCategoria = codigoCategoria;
	}

	public String getObservacaoCategoria() {
		return observacaoCategoria;
	}

	public void setObservacaoCategoria(String observacaoCategoria) {
		this.observacaoCategoria = observacaoCategoria;
	}

	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}

	public int getIdPaiCategoria() {
		return idPaiCategoria;
	}

	public void setIdPaiCategoria(int idPaiCategoria) {
		this.idPaiCategoria = idPaiCategoria;
	}

	public int getStatusCategoria() {
		return statusCategoria;
	}

	public void setStatusCategoria(int statusCategoria) {
		this.statusCategoria = statusCategoria;
	}
}
