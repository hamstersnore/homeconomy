package database

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

type DBConfig struct {
	Host                  string
	Port                  int
	User                  string
	Password              string
	DBName                string
	SSLMode               string
	MaxOpenConnections    int
	MaxIdleConnections    int
	ConnectionMaxLifetime time.Duration
}

func initDb(config DBConfig) (*sql.DB, error) {
	connectionString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s sslmode=%s",
		config.Host,
		config.User,
		config.Password,
		config.DBName,
		config.SSLMode)

	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		return nil, fmt.Errorf("Error opening db connection: %w", err)
	}

	db.SetMaxOpenConns(2)
	db.SetMaxIdleConns(2)
	db.SetConnMaxLifetime(3 * time.Minute)

	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("Error pinging database: %w", err)
	}

	return db, err
}

func OpenDb() *sql.DB {
	config := DBConfig{
		Host:     "db",
		User:     "homeconomy_admin",
		Password: "s4r4nd0ng4",
		DBName:   "homeconomy",
		SSLMode:  "disable",
	}

	db, err := initDb(config)

	if err != nil {
		log.Fatal(err)
	}

	return db
}
