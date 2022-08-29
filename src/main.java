import java.io.*;
import java.util.*;
import java.lang.*;
import java.math.*;

public class main {
    private static int N; //number of players
    private static double elimTime=2; //num seconds person has to move before eliminated
    //move idenification numbers: 1 left, 2 right, 3 upskip, 4 downskip, 5 repeat, 6 undo, negatives are palmed version of a move
    private static int nextPos; //position that should make the next move
    private static boolean direction; //true if ccw, false if cw
    private static boolean palmed; //true if last move was palmed, false if it wasn't
    private static int lastMove; //identification number of last move
    private static int lastPos;
    private static double lastTime; //time that last move was made
    public static int eliminated=0; //position that is eliminated; 0 if no one yet

    public static void setN(int a){
        N=a;
    }

    public static void move(int p, int s){ //a move was made in position p, move identification number s
        int s2=0; //s2 is clone of s, flipped if palmed is true, used numerically in code; this allows next repeat to repeat the original s, not the flipped
        if(lastMove==0&&Math.abs(s)>2){
            eliminate(p);
        }
        if(palmed){
            if(s==1){
                s2=2;
            }
            else if(s==2){
                s2=1;
            }
            else if(s==3){
                s2=4;
            }
            else if(s==4){
                s2=3;
            }
            else if(s==5){
                s2=6;
            }
            else if(s==6){
                s2=5;
            }
            else if(s==-1){
                s2=-2;
            }
            else if(s==-2){
                s2=-1;
            }
            else if(s==-3){
                s2=-4;
            }
            else if(s==-4){
                s2=-3;
            }
            else if(s==-5){
                s2=-6;
            }
            else if(s==-6){
                s2=-5;
            }
        }
        else{
            s2=s;
        }

        if(p!=nextPos){
            eliminate(p);
            return;
        }

        if(Math.abs(s2)==5){
            if(s2>0){
                s2=Math.abs(lastMove);
            }
            else{
                s2=-Math.abs(lastMove);
            }
        }
        if(Math.abs(s2)==1){
            nextPos=(nextPos-1)%N;
            direction=false;
        }
        else if(Math.abs(s2)==2){
            nextPos=(nextPos+1)%N;
            direction=true;
        }
        else if(Math.abs(s2)==3){
            if(direction){
                nextPos=(nextPos+2)%N;
                direction=true;
            }
            else{
                nextPos=(nextPos-2)%N;
                direction=false;
            }
        }
        else if(Math.abs(s2)==4){
            if(direction){
                nextPos=(nextPos-2)%N;
                direction=false;
            }
            else{
                nextPos=(nextPos+2)%N;
                direction=true;
            }
        }
        else if(Math.abs(s2)==6){
            nextPos=lastPos;
            if(direction){
                direction=false;
            }
            else{
                direction=true;
            }
        }
        lastMove=s;
        lastPos=p;
        if(lastMove<0){
            palmed=true;
        }
        else{
            palmed=false;
        }
    }
    
    public static void start(int a){ //make sure first player cannot start with 3,4,5,6
        setN(a);
        nextPos=(int)Math.ceil(N*Math.random());
        lastMove=0;
        lastPos=0;
        eliminated=0;
    }

    public static void eliminate(int p){ //position p eliminated
//        System.out.println("Position "+p+" was eliminated.");
        eliminated=p;
        start(N-1);
    }

    public static void main(String[] args) throws IOException {

    }
}
